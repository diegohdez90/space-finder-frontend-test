import React from "react";
import Spaces from '../../src/pages/Spaces';
import ReactDOM from "react-dom";
import { screen, fireEvent, waitFor, getByText } from "@testing-library/react";
import { DataService } from '../../src/services/DataService'
import { Space } from '../../src/models/Space';

const someSpaces: Space[] = [
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1234"
  },
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1235"
  },
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1236"
  },
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1237"
  }
];

describe("Spaces component test suite", () => {
  const dataServiceMock = {
    getSpaces: jest.fn(),
    reserveSpace: jest.fn()
  };
  //const spaceComponentSpy = jest.spyOn(SpaceComponent, 'render');
  let container: HTMLDivElement;

  beforeEach(() => {
    dataServiceMock.getSpaces.mockResolvedValue(someSpaces);
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <Spaces dataService={(dataServiceMock as any) as DataService} />,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
    jest.clearAllMocks();
  });

  test("Renders all spaces", () => {
    const spaces = document.getElementsByClassName('spaceComponent')
    expect(spaces!.length).toBe(4);
  });

  test("Correctly calls for reservation all spaces", () => {
    const buttons = document.querySelectorAll('button');
    expect(buttons!.length).toBe(4);
    fireEvent.click(buttons[0]);
    expect(dataServiceMock.reserveSpace).toBeCalledWith('1234');
  });

  test("Correctly displays modal with reservation", async () => {
    dataServiceMock.reserveSpace.mockResolvedValueOnce('555');
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    expect(dataServiceMock.reserveSpace).toBeCalledWith('1234');

    await waitFor(() => expect(document.body.querySelector('h5')).toHaveClass('modalText'));
    await waitFor(() => expect(document.body.querySelector('h5')).toHaveTextContent(`You reserved the space with id 1234 and got the reservation number 555`));
  });

  test("Correctly displays modal without reservation", async () => {
    dataServiceMock.reserveSpace.mockResolvedValueOnce(undefined);
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);

    await waitFor(() => expect(document.body.querySelector('h5')).toHaveClass('modalText'));
    await waitFor(() => expect(document.body.querySelector('h5')).toHaveTextContent(`You can't reserve the space with id 1234`));
  });

  test("Correctly closes modal", async () => {
    dataServiceMock.reserveSpace.mockResolvedValueOnce('555');
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);

    await waitFor(() => expect(document.querySelector('button')).toHaveClass('modalButton'));
    fireEvent.click(screen.getByText(/Ok, close/i));

    await waitFor(() => expect(document.body.querySelector('h5.modalText')).not.toBeInTheDocument());

  });


});