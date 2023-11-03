import Moment from "react-moment";
import { SalespersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";
import { Table, Status } from "./styles/SalespersonDetailsTableStyles";

export type SalespersonDetailsTableProps = {
  singleSalesperson: SalespersonReturnedPayload;
};

const SalespersonDetailsTable = ({
  singleSalesperson,
}: SalespersonDetailsTableProps) => {
  if (singleSalesperson) {
    const { fullName, email, phoneNumber, initials, isActive, createdAt } =
      singleSalesperson;
    return (
      <Table>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{fullName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Initials</td>
            <td>{initials}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{phoneNumber}</td>
          </tr>
          <tr>
            <td>Date Created</td>
            <td>
              <Moment>{createdAt}</Moment>
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <Status singleSalesperson={singleSalesperson}>
                {isActive ? "Active" : "Inactive"}
              </Status>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } else {
    return null;
  }
};

export default SalespersonDetailsTable;
