import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //   const [values, setValues] = useState({
  //     name: "",
  //     error: false,
  //     success: false
  //   });

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-success btn-sm mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
          console.log(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const proloadCategory = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError({ error: data.error });
      } else {
        const { name } = data;
        setName(name);
      }
      // console.log(data);
    });
  };

  useEffect(() => {
    proloadCategory(match.params.categoryId);
  }, []);

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">{name} category updated successfully</h4>
      );
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to update {name} category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new catogory for your product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
