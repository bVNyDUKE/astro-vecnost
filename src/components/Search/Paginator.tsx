export default function Paginator({
  count,
  page,
  perPage,
}: {
  count: number;
  page: number;
  perPage: number;
}) {
  const pages = Math.ceil(count / perPage);

  const handlePageChange = (page: number) => {
    const params = new URL(document.location.toString()).searchParams;
    params.set("page", page.toString());

    window.history.pushState({ ...window.history.state, page }, "");
    window.location.replace(
      `${document.location.origin}/pretraga?${params.toString()}`
    );
  };

  return (
    <div className="mb-5 flex justify-center">
      <div className="flex justify-between">
        <button
          className="flex items-center justify-center px-4  py-2 text-sm font-medium hover:shadow-md disabled:text-gray-300 disabled:hover:shadow-none"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="flex items-center justify-center  px-4 py-2 text-sm font-medium hover:shadow-md disabled:text-gray-300 disabled:hover:shadow-none"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        <div className="flex items-center">
          <span className="text-sm font-medium">
            Strana {page} od {pages}
          </span>
        </div>
        <button
          className="flex items-center justify-center  px-4 py-2 text-sm font-medium hover:shadow-md disabled:text-gray-300 disabled:hover:shadow-none"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
        >
          &gt;
        </button>
        <button
          className="flex items-center justify-center  px-4 py-2 text-sm font-medium hover:shadow-md disabled:text-gray-300 disabled:hover:shadow-none"
          onClick={() => handlePageChange(pages)}
          disabled={page === pages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
