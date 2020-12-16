import { ApolloError } from "@apollo/client";
import { Alert, Divider, Skeleton } from "antd";
import React from "react";
import "./styles/ListingsSkeleton.css";

interface Props {
  title: string;
  error?: ApolloError;
}

export const ListingsSkeleton = ({ title, error }: Props) => {
  const errorAlert = error ? (
    <Alert
      type="error"
      message="Something went wrong, please try again later."
      className="listings-skeleton__alert"
    />
  ) : null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
    </div>
  );
};
