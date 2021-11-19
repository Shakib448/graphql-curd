/* eslint-disable testing-library/no-wait-for-snapshot */
/* eslint-disable testing-library/await-async-query */
import { render, screen, waitFor } from "@testing-library/react";
import User from "../User";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_USERS } from "../../Graphql/Queries";
import { GraphQLError } from "graphql";
import { DELETE_USER } from "../../Graphql/Mutation";
import userEvent from "@testing-library/user-event";

describe("Testing with renders", () => {
  it("renders with loading", () => {
    const mocks: any[] = [];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <User />
      </MockedProvider>
    );
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
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

  it("should delete with success message", async () => {
    const mocks = {
      request: {
        query: GET_ALL_USERS,
      },
      result: {
        data: {
          getAllUsers: [{ id: "1", name: "shakib", username: "muktadir" }],
        },
      },
    };
    const deleteUser = { message: "Successfully Delete" };
    const deleteMockUser: any = {
      request: {
        query: DELETE_USER,
        variables: { id: "1" },
      },
      result: {
        data: {
          deleteUser,
        },
      },
    };

    render(
      <MockedProvider mocks={[mocks, deleteMockUser]} addTypename={false}>
        <User />
      </MockedProvider>
    );

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: /delete/i });
      userEvent.click(button);
    });

    const successDeleteMessage = screen.getByText(/Successfully delete!/i);
    expect(successDeleteMessage).toBeInTheDocument();
    expect(successDeleteMessage).toMatchSnapshot();
  });
});
