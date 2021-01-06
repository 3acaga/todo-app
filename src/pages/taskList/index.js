import { useState, useCallback } from "react";
import { Button } from "antd";
import styled from "styled-components/macro";

import ListComponent from "./components/list";
import { colors } from "components/layout/colors";

import { PlusOutlined } from "@ant-design/icons";
import CreateTaskModal from "./components/createTaskModal";

const TaskList = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <PageWrapper>
      <ListWrapper>
        <ListComponent />

        <CreateTaskButton
          //
          type="primary"
          size="large"
          shape="round"
          icon={<PlusOutlined />}
          onClick={openModal}
          data-testid="add-task-button"
        >
          Add new task
        </CreateTaskButton>
      </ListWrapper>

      <CreateTaskModal isOpen={isModalOpen} closeModal={closeModal} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  height: calc(100vh - ${({ $headerHeight }) => $headerHeight}px - 50px);
  padding: 25px;
  overflow: auto;
`;

const ListWrapper = styled.div`
  position: relative;
`;

const CreateTaskButton = styled(Button)`
  //
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${colors.primary};

  & .anticon {
    font-size: 26px;
  }
`;

export default TaskList;
