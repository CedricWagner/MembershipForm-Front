import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MembershipForm from "./MembershipForm";
import { vi } from "vitest";

const onSubmit = vi.fn().mockImplementation(() => {});

describe("<MembershipForm />", () => {
  test("it should mount", () => {
    render(<MembershipForm onSubmit={onSubmit} />);

    const membershipForm = screen.getByTestId("MembershipForm");

    expect(membershipForm).toBeInTheDocument();
  });

  it("should display errors when required fields are not filled", async () => {
    render(<MembershipForm onSubmit={onSubmit} />);

    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test@test.fr",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
    expect(alerts[0].textContent).toBe("Ce champ est requis");
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(
      "test@test.fr"
    );
    expect(onSubmit).not.toBeCalled();
  });

  it("should populate the form data on submit", async () => {
    let data: FormData;
    function mockOnSumbit(_data: FormData) {
      data = _data;
    }

    render(<MembershipForm onSubmit={mockOnSumbit} />);

    fireEvent.input(screen.getByRole("textbox", { name: "Prénom" }), {
      target: {
        value: "MyFirstname",
      },
    });
    fireEvent.input(screen.getByRole("textbox", { name: "Nom" }), {
      target: {
        value: "MyLastname",
      },
    });
    fireEvent.input(screen.getByRole("textbox", { name: "Email" }), {
      target: {
        value: "test@test.fr",
      },
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: "Montant" }), {
      target: {
        value: "2.50",
      },
    });
    fireEvent.change(
      screen.getByRole("combobox", { name: "Moyen de paiement" }),
      {
        target: {
          value: "/payment_methods/1",
        },
      }
    );
    fireEvent.change(
      screen.getByRole("checkbox", { name: "Souhaite devenir bénévole" }),
      {
        target: {
          value: true,
        },
      }
    );
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() =>
      expect(data).toEqual({
        amount: "2.50",
        email: "test@test.fr",
        firstname: "MyFirstname",
        lastname: "MyLastname",
        paymentMethod: "/payment_methods/1",
        willingToVolunteer: false,
      })
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(
      "test@test.fr"
    );
  });
});
