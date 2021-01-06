import React, { useCallback, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { Divider } from "antd";
import styled from "styled-components/macro";

import { getTaskListAction } from "domain/tasks/actions";
import { tasksMetaSelector, tasksResourcesSelector } from "domain/tasks/reducer";

import { LayoutContext } from "components/layout";
import Loader from "components/loader";
import TaskRow from "./taskRow";

const ListComponent = () => {
  const { headerHeight } = useContext(LayoutContext);
  const dispatch = useDispatch();

  const {
    meta: { isLoading, isDataLoaded, loaded, total },
    taskList,
  } = useSelector(mapStateToProps);

  const isInitialLoading = !isDataLoaded && isLoading;
  const perPage = 25;

  const handleLoad = useCallback(() => {
    if (!isLoading) {
      dispatch(
        getTaskListAction({
          from: loaded,
          to: Math.min(loaded + perPage, total),
        }),
      );
    }
  }, [isLoading, loaded, total, dispatch]);

  useEffect(() => {
    dispatch(
      getTaskListAction({
        from: 0,
        to: 100,
      }),
    );
  }, [dispatch]);

  return (
    <Wrapper $headerHeight={headerHeight}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleLoad}
        hasMore={total > loaded}
        loader={<Loader key={-1} />}
        useWindow={false}
      >
        {isInitialLoading ? (
          <Loader key={-1} />
        ) : (
          taskList.map((task, ix) => (
            <React.Fragment key={task.id}>
              <TaskRow task={task} />
              {ix < taskList.length - 1 && <StyledDivider />}
            </React.Fragment>
          ))
        )}
      </InfiniteScroll>
    </Wrapper>
  );
};

const mapStateToProps = (store) => ({
  //
  meta: tasksMetaSelector(store),
  taskList: tasksResourcesSelector(store),
});

const Wrapper = styled.div`
  background: white;
  padding: 50px 15px;
  max-height: calc(100vh - ${({ $headerHeight }) => $headerHeight}px - 100px);

  overflow: auto;
`;

const StyledDivider = styled(Divider)`
  margin: 8px 0;
`;

ListComponent.propTypes = {};

export default ListComponent;
