"use client";

import styled from "styled-components";
import AuthRoleCheck from "@/components/Auth";
import AppLayout from "@/components/layouts/AppLayout";
import { Table } from "@/components/table";
import { Dispatch, RootState } from "@/data";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRole } from "../api/types/user";
import { GasTypesValues } from "@/constants/common";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bgPrimary};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #aaa;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.bgSecondary};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #aaa;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  background: ${({ theme }) => theme.bgHighlight};
  padding: 1rem;
  border: 1px solid gray;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.bgSecondary};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border: 1px solid gray;
  text-align: center;
`;

function Stocks() {
  const dispatch = useDispatch<Dispatch>();
  const { currentStock, stockHistory = [] } = useSelector(
    (state: RootState) => state.outlets
  );

  useEffect(() => {
    dispatch.outlets.fetchStocks();
  }, []);

  const columns = [
    {
      key: "dateAdded",
      label: "Date Added",
      render: (inv: any) => moment(inv.dateAdded).format("YYYY-MM-DD"),
    },
    {
      key: "type",
      label: "Type",
      render: ({ type: key }: { type: string }) => (GasTypesValues as any)[key],
    },
    { key: "quantity", label: "Quantity" },
  ];

  return (
    <AppLayout>
      <PageWrapper>
        <Header>Stock Management</Header>
        <Card>
          <h2>Current Gas Cylinders Stock</h2>
          {currentStock && (
            <StyledTable>
              <tbody>
                {Object.entries(currentStock || {}).map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {(GasTypesValues as any)[item[0]]} Cylinders
                    </TableCell>
                    <TableCell>{item[1]}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          )}
        </Card>
        <TableWrapper>
          <h2>Stocks History</h2>
          <Table columns={columns} data={stockHistory} />
        </TableWrapper>
      </PageWrapper>
    </AppLayout>
  );
}

export default AuthRoleCheck(Stocks, { roles: [UserRole.OUTLET_MANAGER] });
