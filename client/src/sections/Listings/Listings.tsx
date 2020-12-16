import { gql, useMutation, useQuery } from "@apollo/client";
import { Alert, Avatar, Button, List, Spin } from "antd";
import React from "react";
import { ListingsSkeleton } from "./components";
import "./styles/Listings.css";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";
import { Listings as ListingsData } from "./__generated__/Listings";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { loading, error, data, refetch } = useQuery<ListingsData>(LISTINGS);
  const listings = data ? data.listings : [];

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listingslist = listings.length ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={({ id, title, address, image }) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => handleDeleteListing(id)}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={title}
            description={address}
            avatar={<Avatar src={image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error={error} />
      </div>
    );
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Something went wrong deleting a record, please try again later."
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {deleteListingErrorAlert}
        <h2>{title}</h2>
        {listingslist}
      </Spin>
    </div>
  );
};
