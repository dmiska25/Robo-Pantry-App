// App.test.js
import React from "react"
import { render, waitForElement } from "@testing-library/react-native"
import App from "../App"
import { createServer } from "miragejs"

let server

beforeEach(() => {
  server = createServer()
})

afterEach(() => {
  server.shutdown()
})

it("shows the products from our server", async () => {
  server.get("/robo-pantry/products", () => [
    { id: 1, name: "Luke" },
    { id: 2, name: "Leia" },
  ])

  const { getByTestId } = render(<App />)
  await waitForElement(() => getByTestId("user-1"))
  await waitForElement(() => getByTestId("user-2"))

  expect(getByTestId("user-1")).toHaveTextContent("Luke")
  expect(getByTestId("user-2")).toHaveTextContent("Leia")
})