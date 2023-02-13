export default ({ label = "", name = "", feedback = "y", ...rest }) => {
  return (
    <div class="col-md-12">
      <label for="validationCustom01" class="form-label">
        {label}
      </label>
      <input
        type="text"
        class="form-control"
        id="validationCustomUsername"
        name={name}
        aria-describedby="inputGroupPrepend"
        required
        {...rest}
      />
      <div class="valid-feedback">{feedback}</div>
    </div>
  );
};
