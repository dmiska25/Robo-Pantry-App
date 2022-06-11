// useAPI.test.js
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react-native";
import axios from "axios";
import { useAPI } from "../../../content/api/Hooks/useAPI";
import { QueryClient, QueryClientProvider } from "react-query";
import * as queryClientBeen from "../../../content/constants/queryClient";

jest.setTimeout(5000);
jest.mock("axios");
jest.mock("sentry-expo", () => ({
  init: () => jest.fn(),
  Native: {
    captureException: () => jest.fn(),
  },
}));
const queryClientSpy = jest.spyOn(queryClientBeen, "getQueryClient");

const mockData = { data: [{ test: "test" }] };

var wrapper;

describe("fetch api data", () => {
  beforeEach(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    queryClientSpy.mockImplementation(() => queryClient);
  });

  afterEach(() => {
    axios.get.mockClear();
    queryClientSpy.mockReset();
  });

  describe("on success", () => {
    beforeEach(() => {
      axios.get.mockResolvedValueOnce(mockData);
    });

    describe("with no params", () => {
      it("should set data to test data and set isLoading false", async () => {
        const getTestData = () => axios.get("/testEndpoint");
        const { result, waitForNextUpdate } = renderHook(
          () => useAPI(getTestData),
          { wrapper }
        );

        await act(async () => {
          await waitForNextUpdate();
        });

        const { data: expectedData } = mockData;

        expect(result.current[0]).toEqual(false);
        expect(result.current[1]).toEqual(expectedData);
        expect(result.current[2]).toEqual(undefined);
      });
    });

    describe("with params", () => {
      it("should pass params to apiFunction", async () => {
        const getTestDataWithParams = (testId) =>
          axios.get(`/testEndpoint/${testId}`);
        const { waitForNextUpdate } = renderHook(
          () => useAPI(getTestDataWithParams, 5),
          { wrapper }
        );

        await act(async () => {
          await waitForNextUpdate();
        });

        expect(axios.get).toHaveBeenCalledWith("/testEndpoint/5");
      });
    });

    describe("with 'onSuccess' lambda", () => {
      it("should call the lambda once after success", async () => {
        const mockOnSuccess = jest.fn();
        const getTestData = () => axios.get("/testEndpoint");
        const { result, waitForNextUpdate } = renderHook(
          () => useAPI(getTestData, undefined, { onSuccess: mockOnSuccess }),
          { wrapper }
        );

        await act(async () => {
          await waitForNextUpdate();
        });

        const { data: expectedData } = mockData;

        expect(result.current[0]).toEqual(false);
        expect(result.current[1]).toEqual(expectedData);
        expect(result.current[2]).toEqual(undefined);

        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("conditional", () => {
    const getTestDataWithParams = (testId) =>
      axios.get(`/testEndpoint/${testId}`);

    describe("when true", () => {
      it("should skip api call", () => {
        renderHook(
          () => useAPI(getTestDataWithParams, 5, { conditional: () => true }),
          { wrapper }
        );

        expect(axios.get).toHaveBeenCalledTimes(0);
      });
    });

    describe("when false", () => {
      beforeEach(() => {
        axios.get.mockResolvedValueOnce(mockData);
      });

      it("execute api call", async () => {
        const { waitForNextUpdate } = renderHook(
          () => useAPI(getTestDataWithParams, 5, { conditional: () => false }),
          { wrapper }
        );

        await act(async () => {
          await waitForNextUpdate();
        });

        expect(axios.get).toHaveBeenCalledWith("/testEndpoint/5");
      });
    });

    describe("when not passed", () => {
      beforeEach(() => {
        axios.get.mockResolvedValueOnce(mockData);
      });

      it("execute api call", async () => {
        const { waitForNextUpdate } = renderHook(
          () => useAPI(getTestDataWithParams, 5),
          { wrapper }
        );

        await act(async () => {
          await waitForNextUpdate();
        });

        expect(axios.get).toHaveBeenCalledWith("/testEndpoint/5");
      });
    });
  });

  describe("on failure", () => {
    const getTestData = () => axios.get("/testEndpoint");
    beforeEach(() => {
      axios.get.mockRejectedValueOnce();
    });
    it("should set error to failure message and set isLoading false", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () =>
          useAPI(getTestData, undefined, {
            onFailure: () => {
              throw Error("Cannot retireve test Data!");
            },
          }),
        { wrapper }
      );

      await act(async () => {
        await waitForNextUpdate();
      });

      expect(axios.get).toHaveBeenCalled();
      expect(result.current[0]).toEqual(false);
      expect(result.current[1]).toEqual(undefined);
      expect(result.current[2]).toEqual("Cannot retireve test Data!");
    });
  });

  describe("reloadData", () => {
    const getTestData = () => axios.get("/testEndpoint");
    beforeEach(() => {
      axios.get.mockResolvedValue(
        new Promise((resolve) => setTimeout(() => resolve(mockData), 1000))
      );
    });

    it("shouldn't load data if already loading", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useAPI(getTestData),
        { wrapper }
      );

      const reload = result.current[3];
      reload();

      await act(async () => {
        await waitForNextUpdate();
      });

      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should load data again if not already loading", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useAPI(getTestData),
        { wrapper }
      );

      await act(async () => {
        await waitForNextUpdate();
      });

      const reload = result.current[3];
      act(() => {
        reload();
      });

      await act(async () => {
        await waitForNextUpdate();
      });

      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});
