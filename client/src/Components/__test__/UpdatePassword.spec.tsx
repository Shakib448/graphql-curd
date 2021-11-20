/* eslint-disable jest/no-identical-title */
/* eslint-disable testing-library/no-wait-for-snapshot */
/* eslint-disable testing-library/await-async-query */
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { DELETE_USER, UPDATE_PASSWORD } from "../../Graphql/Mutation";
import userEvent from "@testing-library/user-event";
import UpdatePassword from "../UpdatePassword";
import { DeleteButton, DELETE_DOG_MUTATION } from "../Dummy";

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

  // it("should updated the password with success message", async () => {
  //   const updatePassword = { message: "Successfully updated!" };
  //   const updateUser: any = {
  //     request: {
  //       query: UPDATE_PASSWORD,
  //       variables: {
  //         username: "username",
  //         oldPassword: "oldPassword",
  //         newPassword: "newPassword",
  //       },
  //     },
  //     result: {
  //       data: {
  //         updatePassword,
  //       },
  //     },
  //   };

  //   const { container, getByRole, getByText } = render(
  //     <MockedProvider mocks={[updateUser]} addTypename={false}>
  //       <UpdatePassword />
  //     </MockedProvider>
  //   );

  //   const button = getByRole("button", { name: /update password/i });
  //   userEvent.click(button);

  //   await waitFor(async () => {
  //     const successSubmitMessage = getByText(/Successfully submitted!/i);
  //     expect(successSubmitMessage).toBeInTheDocument();
  //     expect(container).toMatchSnapshot();
  //   });
  // });

  it("should delete with success message", async () => {
    const deleteUser = { message: "Successfully Delete" };
    const deleteMockUser: any = {
      request: {
        query: DELETE_DOG_MUTATION,
        variables: {
          name: "Buck",
          breed: "Breed",
        },
      },
      result: {
        data: {
          deleteUser,
        },
      },
    };

    render(
      <MockedProvider mocks={[deleteMockUser]} addTypename={false}>
        <DeleteButton />
      </MockedProvider>
    );

    const button = screen.getByRole("button", { name: /update password/i });
    userEvent.click(button);

    await waitFor(async () => {
      const successDeleteMessage = screen.getByText(/Success!/i);
      expect(successDeleteMessage).toBeInTheDocument();
      expect(successDeleteMessage).toMatchSnapshot();
    });
  });
});
