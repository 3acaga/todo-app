import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useFormik, FormikProvider } from "formik";
import { Modal, Input } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import { createTaskAction } from "domain/tasks/actions";

import FormDatePicker from "components/form/datePicker";

const { TextArea } = Input;

const CreateTaskModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      description: "",
      validUntil: "",
    },
    onSubmit: () => {},
  });

  const handleCreateModal = useCallback(() => {
    //
    dispatch(
      createTaskAction({
        ...formik.values,
        isFinished: false,
      }),
    );

    closeModal();
  }, [formik.values, dispatch, closeModal]);

  return (
    <Modal
      //
      title="Create new task"
      visible={isOpen}
      onOk={handleCreateModal}
      onCancel={closeModal}
      centered
    >
      <FormikProvider value={formik}>
        <ModalForm>
          <TextArea
            //
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            rows={4}
          />

          <FormDatePicker
            //
            name="validUntil"
          />
        </ModalForm>
      </FormikProvider>
    </Modal>
  );
};

const ModalForm = styled.form`
  & > * {
    margin: 10px 0;
    width: 100%;
  }
`;

CreateTaskModal.propTypes = {
  //
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CreateTaskModal;
