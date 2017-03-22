import React from 'react';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import RaisedButton from 'material-ui/RaisedButton';
import './LoadMoreButton.css';

const LoadMoreButton = ({ callback, page, total_pages, loadMore }) => {

  if (page < total_pages) {
    return <RaisedButton
        className="LoadMoreButton"
        icon={<AddCircleOutline/>}
        fullWidth={true}
        label="Load more"
        labelPosition="before"
        onClick={loadMore.bind(null, callback)}
        primary={true}
    />;
  }

  return <div className="EndOfMoviesList">End of Movies list.</div>;
};

export default LoadMoreButton;
