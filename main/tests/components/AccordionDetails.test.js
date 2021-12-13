import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

const mockSectionData = [
    {
        id: 2,
        brand: 'A&W',
        productsOnHand: 4,
        unitsPerProduct: 8.0,
        purchases: [
            {
                id: 3,
                purchaseDate: new Date(2021, 8, 19),
                productsPurchased: 2
            },
            {
                id: 4,
                purchaseDate: new Date(2021, 8, 22),
                productsPurchased: 2
            }
        ],
        barcode: 45634256
    },
    {
        id: 5,
        brand: 'Barqs',
        productsOnHand: 4,
        unitsPerProduct: 8.0,
        purchases: [
            {
                id: 6,
                purchaseDate: new Date(2021, 8, 19),
                productsPurchased: 2
            },
            {
                id: 7,
                purchaseDate: new Date(2021, 8, 22),
                productsPurchased: 2
            }
        ],
        barcode: 45634256
    }
];

const mockPurchases = mockSectionData[0].purchases;
const mockRow = jest.fn().mockReturnValue(<Text/>);
const mockRows = jest.fn().mockReturnValue(<Text/>);
jest.mock("react-native-table-component", () => ({
        __esModule: true,
        ...jest.requireActual("react-native-table-component"),
        Row: mockRow,
        Rows: mockRows 
}));

const {forTesting, default: AccordionDetails} = require("../../content/Components/AccordionDetails");
const {renderPurchasesTable, renderHeader, renderSectionTitle} = forTesting;


describe('AccordionDetails', () => {
    describe('on standard render', () => {
        it('renders Accordion', () => {
            const { getByTestId } = render(<AccordionDetails sectionData={mockSectionData}/>);
            getByTestId("accordion");
        })
    })
})

describe('renderPurchasesTable', () => {
    describe('with purchases mock', () => {
        it('renders table correctly', () => {
            render(renderPurchasesTable(mockPurchases));
            expect(mockRow).toHaveBeenCalledWith({"data": ["Quantity Purchased", "Purchase Date"]}, {});
            expect(mockRows).toHaveBeenCalledWith({"data": [[2, "9/19/2021"], [2, "9/22/2021"]]}, {});
        })
    })
})

describe('renderHeader', () => {
    describe('on standard render', () => {
        it('renders correct info', () => {
            const mockAandW = mockSectionData[0];
            const {getByText, debug} = render(renderHeader(mockAandW));
            // has headers
            getByText(/Products on Hand/i);
            getByText(/units per product/i);
            getByText(/purchase details/i);

            // has expected results
            getByText(/4/);
            getByText(/8/);
        })
    })
})

describe('renderSectionTitle', () => {
    describe('on standard render', () => {
        it('renders correct info', () => {
            const mockAandW = mockSectionData[0];
            const {getByText, debug} = render(renderSectionTitle(mockAandW));
            //has correct header
            const header = getByText(/A\&W/);
            expect(header._fiber.stateNode.props.style.fontWeight).toBe('bold');
        })
    })
})