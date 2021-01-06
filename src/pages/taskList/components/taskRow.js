import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Button, Checkbox } from "antd";
import { isBefore, parseISO, endOfDay } from "date-fns";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

import { updateTaskAction, deleteTaskAction } from "domain/tasks/actions";

import { DeleteFilled, LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

const TaskRow = ({ task: { id, isFinished, validUntil, description } }) => {
  const dispatch = useDispatch();
  const [isUpdating, setUpdating] = useState(false);

  const isExpired = isBefore(parseISO(validUntil), endOfDay(new Date()));

  const handleTaskStatusChange = useCallback(
    (e) => {
      setUpdating(true);
      dispatch(
        updateTaskAction({
          params: {
            id,
          },
          data: {
            isFinished: e.target.checked,
          },
        }),
      ).finally(() => setUpdating(false));
    },
    [dispatch, id],
  );

  const handleTaskDelete = useCallback(() => {
    setUpdating(true);
    dispatch(deleteTaskAction({ id }));
  }, [dispatch, id]);

  return (
    <Row data-testid="task-row">
      <ColCentered span={2}>
        {isExpired ? (
          <ExpiredIcon />
        ) : (
          <StatusCheckbox
            //
            checked={isFinished}
            onClick={handleTaskStatusChange}
            disabled={isUpdating}
          />
        )}
      </ColCentered>

      <Col span={20}>{description}</Col>

      <ColCentered span={2}>
        <DeleteButton
          type="text"
          size="large"
          shape="circle"
          icon={isUpdating ? <LoadingOutlined /> : <DeleteFilled />}
          onClick={handleTaskDelete}
          disabled={isUpdating}
        />
      </ColCentered>
    </Row>
  );
};

const ColCentered = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: grey;
`;
const StatusCheckbox = styled(Checkbox)`
  color: grey;
`;

const ExpiredIcon = styled(CloseCircleOutlined)`
  font-size: 18px;
`;

const DeleteButton = styled(Button)`
  color: grey;
`;

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    isFinished: PropTypes.bool,
    validUntil: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default TaskRow;
