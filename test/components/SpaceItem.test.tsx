import { fireEvent, getByAltText, getByRole } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import SpaceItem from '../../src/components/SpaceItem';
import { screen } from '@testing-library/react'
import React from 'react';

describe('Space component test suite', () => {
    let container: HTMLDivElement;
    const reserveSpaceMock = jest.fn();

    function setUpTests(element: React.FunctionComponentElement<any>) {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(element, container);
    }

    function cleanUpTests() {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    }

    describe('Test with photo profile', () => {

        beforeEach(() => {
            setUpTests(<SpaceItem
                location='Mexico'
                name='Office'
                reserveSpace={reserveSpaceMock}
                spaceId='1234'
                photoUrl='some.url.photo'
            />);
        });

        test('Show image correctly', () => {
            const img: HTMLImageElement = screen.getByAltText('space');
            expect(img!).toBeInTheDocument();
            expect(img!).toHaveAttribute('src', 'some.url.photo');
        });

        test('Show tabels correctly', () => {
            const labels = container.querySelectorAll('label');
            expect(labels[0]).toHaveTextContent('Office');
            expect(labels[1]).toHaveTextContent('1234');
            expect(labels[2]).toHaveTextContent('Mexico');
        });

        test('Show reserve space button', () => {
            const button = container.querySelector('button');
            fireEvent.click(button!);
            expect(reserveSpaceMock).toBeCalled();
        });

        afterEach(() => {
            cleanUpTests();
        });
    });

    describe('Test without photo profile', () => {
        beforeEach(() => {
            setUpTests(<SpaceItem
                location='Mexico'
                name='Office'
                reserveSpace={reserveSpaceMock}
                spaceId='1234'
            />);
        });

        test('Show image correctly', () => {
            const img: HTMLImageElement = screen.getByAltText('no-available');
            expect(img!).toBeInTheDocument();
            expect(img!).toHaveAttribute('src', 'https://via.placeholder.com/150');
        });

        test('Show tabels correctly', () => {
            const labels = container.querySelectorAll('label');
            expect(labels[0]).toHaveTextContent('Office');
            expect(labels[1]).toHaveTextContent('1234');
            expect(labels[2]).toHaveTextContent('Mexico');
        });

        test('Show reserve space button', () => {
            const button = container.querySelector('button');
            fireEvent.click(button!);
            expect(reserveSpaceMock).toBeCalled();
        });

        afterEach(() => {
            cleanUpTests();
        });
    });



});