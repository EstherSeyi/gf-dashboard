import Button from "./button";

type MetaDataType = {
  current_page: number;
  total_pages: number;
  total_count: number;
  count: number;
};

const Pagination = ({
  children,
  metaData,
  handlePageChange,
}: {
  children: JSX.Element | JSX.Element[];
  metaData: MetaDataType;
  handlePageChange: (pageToGo: number) => void;
}) => {
  return (
    <>
      {children}
      <div className="flex items-center justify-between text-grey-40 text-sm px-2 border-t border-grey-90 py-4">
        <p>
          <span>
            {" "}
            Page {metaData.current_page} of {metaData.total_pages}
          </span>
        </p>

        <div className="flex items-center gap-x-2">
          <Button
            disabled={metaData.current_page === 1}
            onClick={() => handlePageChange(metaData.current_page - 1)}
            className="border border-black rounded-lg shadow-sm bg-transparent disabled:opacity-50 px-2 outline-black text-black disabled:cursor-not-allowed"
          >
            <span className="font-semibold">Previous</span>
          </Button>
          <Button
            data-testid="pagination-next-button"
            disabled={metaData.current_page === metaData.total_pages}
            onClick={() => handlePageChange(metaData.current_page + 1)}
            className="border border-black rounded-lg shadow-sm bg-transparent disabled:opacity-50 px-2 outline-black text-black disabled:cursor-not-allowed"
          >
            <span className="font-semibold">Next</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
