import React from 'react';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';

export const mutation = gql`
  mutation uploadCommunityCover(
    $communityId: ID!
    $input: OrganisationInput!
  ) {
    community: editOrganisation(id: $communityId, input: $input) {
      id
      cover
    }
  }
`;

export const query = gql`
query getCommunity ($communityId: ID!) {
  community: organisation (id: $communityId) {
    id
    coverUploadOpts
  }
}
`;


const withCommunityUploadCover = (WrappedComponent) => {
  return class extends React.Component {
    uploadCover = (file) => {
      return this.props.client.query({
        query: query,
        variables: {
          communityId: this.props.communityId,
        }
      })
      .then(({ data }) => {
        if (!data.community.coverUploadOpts) throw new Error('no upload options');
        const options = JSON.parse(data.community.coverUploadOpts)
        const formdata = new window.FormData();
        Object.keys(options).forEach(key => formdata.append(key, options[key]));
        formdata.append('file', file);
        return window.fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formdata,
        })
        .then(response => {
          if (!response.ok) throw new Error('upload failed');
          return response.json()
        })
        .then(json => {
          return this.props.client.mutate({
            mutation: mutation,
            variables: {
              communityId: this.props.communityId,
              input: {
                cover: json.version
              }
            },
            optimisticResponse: {
              __typename: 'Mutation',
              community: {
                __typename: 'Organisation',
                id: this.props.communityId,
                cover: json.secure_url,
              }
            },
          })
        })
      })
    }
    render() {
      return <WrappedComponent uploadCover={this.uploadCover} {...this.props} />
    }
  }
}

export default compose(withApollo, withCommunityUploadCover)
