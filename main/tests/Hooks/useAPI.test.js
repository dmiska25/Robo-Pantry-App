// useAPI.test.js
import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react-native";
import axios from "axios";
import { useAPI } from "../../content/Hooks/useAPI";

jest.mock("axios");

const mockData = {data: [{"test":"test"}]};

describe("fetch api data", () => {
    describe("on success", () => {
        it("should set data to test data and set isLoading false", async () => {
            const getTestData = () => axios.get("/testEndpoint");
            axios.get.mockResolvedValueOnce(mockData);
            const {result, waitForNextUpdate } = renderHook(() => useAPI(getTestData));

            await act( async () => {
                await waitForNextUpdate();
            })

            const {data: expectedData} = mockData;

            expect(result.current[0]).toEqual(false);
            expect(result.current[1]).toEqual(expectedData);
            expect(result.current[2]).toEqual(null);
        })
    })

    describe("when passed params", () => {
        it("should pass params to apiFunction", async () => {
            const getTestDataWithParams = (testId) => axios.get(`/testEndpoint/${testId}`);
            axios.get.mockResolvedValueOnce(mockData);
            const { waitForNextUpdate } = renderHook(() => useAPI(getTestDataWithParams, 5));

            await act( async () => {
                await waitForNextUpdate();
            })

            expect(axios.get).toHaveBeenCalledWith("/testEndpoint/5");
        })
    })

    describe("on failure", () => {
        it("should set error to failure message and set isLoading false", async () => {
            const getTestData = () => axios.get("/testEndpoint");
            axios.get.mockRejectedValueOnce();
            const {result, waitForNextUpdate } = renderHook(() => useAPI(getTestData));

            await act( async () => {
                await waitForNextUpdate();
            })

            expect(result.current[0]).toEqual(false);
            expect(result.current[1]).toEqual(null);
            expect(result.current[2]).toEqual("Something went wrong!");
        })
    })
})