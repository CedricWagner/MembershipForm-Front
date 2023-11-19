import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
const fetchMocker = createFetchMock(vi);

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import TResource from "./type";

const onSubmit = vi.fn().mockImplementation(() => {});
const renderForm = (
  <Form
    onSubmit={onSubmit}
    reset={() => {}}
    initialValues={{
      date: new Date().toISOString().split("T")[0],
    }}
  />
);

describe("<Form<Member> />", () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
    fetchMocker.mockResponseOnce(
      JSON.stringify({
        "@context": "/api/contexts/PaymentMethod",
        "@id": "/api/payment_methods",
        "@type": "hydra:Collection",
        "hydra:totalItems": 4,
        "hydra:member": [
          {
            "@id": "/api/payment_methods/13",
            "@type": "PaymentMethod",
            id: 13,
            name: "CB",
          },
          {
            "@id": "/api/payment_methods/14",
            "@type": "PaymentMethod",
            id: 14,
            name: "Espèce",
          },
          {
            "@id": "/api/payment_methods/15",
            "@type": "PaymentMethod",
            id: 15,
            name: "Stück",
          },
          {
            "@id": "/api/payment_methods/16",
            "@type": "PaymentMethod",
            id: 16,
            name: "CB Stück",
          },
        ],
      })
    );
  });

  test("it should mount", () => {
    render(renderForm);

    const memberForm = screen.getByTestId("MemberForm");

    expect(memberForm).toBeInTheDocument();
  });

  it("should display errors when required fields are not filled", async () => {
    render(renderForm);

    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test@test.fr",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
    expect(alerts[0].textContent).toBe(
      "Une erreur est survenueCe champ est requis"
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(
      "test@test.fr"
    );
    expect(onSubmit).not.toBeCalled();
  });

  it("should populate the form data on submit", async () => {
    let submittedData: Partial<TResource>;
    function mockOnSumbit(data: Partial<TResource>) {
      submittedData = data;
    }

    render(
      <Form
        onSubmit={mockOnSumbit}
        reset={() => {}}
        initialValues={{
          date: new Date().toISOString().split("T")[0],
        }}
      />
    );

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
        value: "2.5",
      },
    });

    fireEvent.change(
      await screen.findByRole("combobox", { name: "Moyen de paiement" }),
      {
        target: {
          value: "/api/payment_methods/13",
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
      expect(submittedData).toEqual({
        amount: "2.5",
        date: new Date().toISOString().split("T")[0],
        email: "test@test.fr",
        firstname: "MyFirstname",
        lastname: "MyLastname",
        paymentMethod: "", // TODO: fix this
        willingToVolunteer: false,
      })
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(
      "test@test.fr"
    );
  });
});
