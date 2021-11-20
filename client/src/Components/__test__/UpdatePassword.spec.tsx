/* eslint-disable jest/no-identical-title */
/* eslint-disable testing-library/no-wait-for-snapshot */
/* eslint-disable testing-library/await-async-query */
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { UPDATE_PASSWORD } from "../../Graphql/Mutation";
import userEvent from "@testing-library/user-event";
import UpdatePassword from "../UpdatePassword";

describe("Testing with renders", () => {
  it("should updated the password with success message", async () => {
    const updatePassword = { message: "Successfully updated!" };
    const updateUser: any = {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          username: "",
          oldPassword: "",
          newPassword: "",
        },
      },
      result: {
        data: {
          updatePassword,
        },
      },
    };

    const { container, getByRole, findByText } = render(
      <MockedProvider mocks={[updateUser]} addTypename={false}>
        <UpdatePassword />
      </MockedProvider>
    );

    const button = getByRole("button", { name: /update password/i });
    userEvent.click(button);

    const SubmittingMessage = await findByText(/Submitting.../i);
    expect(SubmittingMessage).toBeInTheDocument();

    await waitFor(async () => {
      const successSubmitMessage = await findByText(/Successfully submitted!/i);
      expect(successSubmitMessage).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });
});
