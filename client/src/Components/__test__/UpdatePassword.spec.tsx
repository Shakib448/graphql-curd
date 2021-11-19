/* eslint-disable testing-library/no-wait-for-snapshot */
/* eslint-disable testing-library/await-async-query */
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { UPDATE_PASSWORD } from "../../Graphql/Mutation";
import userEvent from "@testing-library/user-event";
import UpdatePassword from "../UpdatePassword";

describe("Testing with renders", () => {
  it("renders with loading", () => {
    const mocks: any[] = [];
    const { container, getByText, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdatePassword />
      </MockedProvider>
    );

    const button = getByRole("button", { name: /update password/i });

    userEvent.click(button);

    const SubmittingMessage = getByText(/Submitting.../i);
    expect(SubmittingMessage).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("should delete with success message", async () => {
    const updateMessage = { message: "Successfully Delete" };
    const deleteMockUser: any = {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          username: "shakib",
          oldPassword: "muktadir",
          newPassword: "123456",
        },
      },
      result: {
        data: {
          updateMessage,
        },
      },
    };

    const { container, getByRole, getByText } = render(
      <MockedProvider mocks={[deleteMockUser]} addTypename={false}>
        <UpdatePassword />
      </MockedProvider>
    );

    const button = getByRole("button", { name: /update password/i });
    userEvent.click(button);

    await waitFor(async () => {
      const successDeleteMessage = getByText(/Successfully submitted!/i);
      expect(successDeleteMessage).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
