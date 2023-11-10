import Moment from "react-moment";
import { SalespersonCustomerResponsePayload } from "src/services/salespersons/customers/types";
import { Table, Status } from "../styles/SalespersonDetailsTableStyles";

export type SalespersonCustomerDetailsTableProps = {
  singleSalespersonCustomer: SalespersonCustomerResponsePayload;
};

const SalespersonCustomerDetailsTable = ({
  singleSalespersonCustomer,
}: SalespersonCustomerDetailsTableProps) => {
  if (singleSalespersonCustomer) {
    const {
      companyName,
      companyEmail,
      address,
      contactName,
      customerCode,
      createdAt,
      phoneNumber,
      priceCode,
      referrer,
    } = singleSalespersonCustomer;
    return (
      <Table>
        <tbody>
          <tr>
            <td>Company Name</td>
            <td>{companyName}</td>
          </tr>
          <tr>
            <td>Company Email</td>
            <td>{companyEmail ? companyEmail : "N/A"}</td>
          </tr>
          <tr>
            <td>Customer Code</td>
            <td>{customerCode}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
          <tr>
            <td>Contact Name</td>
            <td>{contactName}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{phoneNumber ? phoneNumber : "N/A"}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{priceCode ? priceCode : "N/A"}</td>
          </tr>
          <tr>
            <td>Referred by</td>
            <td>{referrer.fullName}</td>
          </tr>
          <tr>
            <td>Date Created</td>
            <td>
              <Moment>{createdAt}</Moment>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } else {
    return null;
  }
};

export default SalespersonCustomerDetailsTable;
