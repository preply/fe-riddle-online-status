import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App tests", () => {
  const renderComponent = () => render(<App />);
  const STATUS_ONLINE_TEXT = "Online";
  const STATUS_OFFLINE_TEXT = "Offline";
  const STATUS_INDICATOR_LABEL_TEXT = "Status Indicator";
  const STATUS_LABEL_TEXT = "Status";
  const SECTION_MAIN_ROLE = "main";
  const BUTTON_ROLE = "button";

  test("Online Status text is rendered, when user clicks the 'Online' button", async () => {
    // render the component under test
    renderComponent();

    // get the notification container by its accesibility label
    const notificationContainer = await screen.findByLabelText(
      STATUS_INDICATOR_LABEL_TEXT
    );

    // get the buttons container by the main role
    const buttonsContainer = screen.getByRole(SECTION_MAIN_ROLE);
    // get the "Online" button by the online status text
    const onlineButton = await within(buttonsContainer).findByRole(
      BUTTON_ROLE,
      {
        exact: false,
        name: STATUS_ONLINE_TEXT
      }
    );

    // click the "Online" button
    userEvent.click(onlineButton);

    // get the status indicator from the notification center container ...
    const satusIndicatorText = await within(
      notificationContainer
    ).findByText(STATUS_ONLINE_TEXT, { exact: false });

    // ... and assert that the right status is rendered
    expect(satusIndicatorText.toBeInTheDocument);
  });

  // this test will only pass if the notifications are not duplicated when the user interacts
  test("Offline Status text is rendered, when user clicks the 'Offline' button", async () => {
    // render the component under test
    renderComponent();

    // get the notification container by its accesibility label
    const notificationContainer = await screen.findByLabelText(
      STATUS_LABEL_TEXT
    );

    // get the buttons container by the main role
    const buttonsContainer = screen.getByRole(SECTION_MAIN_ROLE);
    // get the "Online" button by the online status text
    const offlineButton = await within(buttonsContainer).findByRole(
      BUTTON_ROLE,
      {
        exact: false,
        name: STATUS_OFFLINE_TEXT
      }
    );

    // click the "Online" button
    userEvent.click(offlineButton);

    // get the status indicator from the notification center container ...
    const satusIndicatorText = within(
      notificationContainer
    ).getByText(STATUS_OFFLINE_TEXT, { exact: false });

    // ... and assert that the right status is rendered
    expect(satusIndicatorText.toBeInTheDocument);
  });
});
