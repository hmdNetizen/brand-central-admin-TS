import Moment from "react-moment";
import { UserProfileReturnedPayload } from "src/services/user/UserTypes";
import { Table, Status } from "./styles/CustomerDetailsTableStyles";

export type CustomerDetailsProps = {
  singleCustomer: UserProfileReturnedPayload;
};

const CustomerDetailsTable = ({ singleCustomer }: CustomerDetailsProps) => {
  if (singleCustomer) {
    const {
      companyName,
      companyEmail,
      companyPhoneNumber,
      businesContact,
      businessType,
      paymentMethod,
      taxID,
      primaryContactName,
      primaryContactEmail,
      primaryContactRole,
      primaryContactPhoneNumber,
      referrer,
      isBlocked,
      userId,
      document,
      createdAt,
    } = singleCustomer;
    return (
      <Table>
        <tbody>
          <tr>
            <td>Company Name</td>
            <td>{companyName}</td>
          </tr>
          <tr>
            <td>Company Email</td>
            <td>{companyEmail}</td>
          </tr>
          <tr>
            <td>Company Phone</td>
            <td>{companyPhoneNumber}</td>
          </tr>
          <tr>
            <td>CustomerId</td>
            <td>{userId}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{businesContact?.address}</td>
          </tr>
          <tr>
            <td>City/State/Zip Code</td>
            <td>{`${businesContact?.city}, ${businesContact?.state}, ${businesContact?.postalCode}`}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{businesContact?.country}</td>
          </tr>
          <tr>
            <td>Business Type</td>
            <td>{businessType}</td>
          </tr>
          <tr>
            <td>Service Type</td>
            <td>{paymentMethod}</td>
          </tr>
          <tr>
            <td>VAT/TAX ID</td>
            <td>{taxID}</td>
          </tr>
          <tr>
            <td>Primary Contact Name</td>
            <td>{primaryContactName}</td>
          </tr>
          <tr>
            <td>Primary Contact Email</td>
            <td>{primaryContactEmail ? primaryContactEmail : "N/A"}</td>
          </tr>
          <tr>
            <td>Primary Contact Role</td>
            <td>{primaryContactRole}</td>
          </tr>
          <tr>
            <td>Primary Contact Phone</td>
            <td>
              {primaryContactPhoneNumber ? primaryContactPhoneNumber : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Referral</td>
            <td>{referrer?.name ? referrer.name : "N/A"}</td>
          </tr>
          <tr>
            <td>Referral Description</td>
            <td>{referrer?.description ? referrer.description : "N/A"}</td>
          </tr>
          <tr>
            <td>Reseller's Certificate</td>
            <td>
              {document ? (
                <a href={document} download="document">
                  document
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>Date Registered</td>
            <td>
              <Moment>{createdAt}</Moment>
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <Status singleCustomer={singleCustomer}>
                {isBlocked ? "Blocked" : "Active"}
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

export default CustomerDetailsTable;
