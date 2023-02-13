export default ({ children,heading="" }) => {
  return (
    <div>
      <br />
      <h2 id="headings">{heading}</h2>
      <br />
      <div className="container g-3">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row ">
              <div className="container col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
