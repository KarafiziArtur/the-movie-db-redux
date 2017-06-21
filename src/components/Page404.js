import React from 'react';

const localStyles = {
  errorText: { marginTop: '20px', textAlign: 'center' }
};

const Page404 = () => (
    <h1 className="Page404" style={localStyles.errorText}>Error 404. There is no any page with such address.</h1>
);

export default Page404;
