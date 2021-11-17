/* eslint-disable testing-library/await-async-query */
import { render, screen, waitFor } from "@testing-library/react";
import User from "../User";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_USERS } from "../../Graphql/Queries";
import { GraphQLError } from "graphql";

describe("Testing with renders", () => {
  it("renders with loading", () => {
    const mocks: any[] = [];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <User />
      </MockedProvider>
    );
    const componentText = screen.getByText(/Loading.../i);
    expect(componentText).toBeInTheDocument();
  });

  it("Should render by length users data and also data", async () => {
    const mocks = {
      request: {
        query: GET_ALL_USERS,
      },
      result: {
        data: {
          getAllUsers: [
            { id: 1, name: "shakib", username: "muktadir" },
            { id: 2, name: "shakib1", username: "muktadir1" },
          ],
        },
      },
    };

    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <User />
      </MockedProvider>
    );

    await waitFor(async () => {
      const text = screen.getAllByRole("heading", {
        name: /username/i,
      });

      expect(text).toHaveLength(2);
      expect(Array.isArray(text)).toBeTruthy();

      // eslint-disable-next-line testing-library/no-wait-for-snapshot
      expect(text).toMatchSnapshot();
    });
  });

  it("should show error UI", async () => {
    const mocks = {
      request: {
        query: GET_ALL_USERS,
      },
      result: {
        errors: [new GraphQLError("Error!")],
      },
    };

    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <User />
      </MockedProvider>
    );
    await waitFor(async () => {
      const errorText = screen.getByText(/error!/i);

      expect(errorText).toBeInTheDocument();
    });
  });
});
