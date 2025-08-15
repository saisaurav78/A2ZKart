import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export const PaginationContainer = ({ TOTAL_PAGES, currPage, setCurrPage }) => {
  const getPageNumbers = () => {
    let pages = [];

    // Always show first page
    if (currPage > 3) {
      pages.push(1);
      if (currPage > 4) pages.push('ellipsis-left');
    }

    // Calculate visible range
    const startPage = Math.max(1, currPage - 2);
    const endPage = Math.min(TOTAL_PAGES, currPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (currPage < TOTAL_PAGES - 2) {
      if (currPage < TOTAL_PAGES - 3) pages.push('ellipsis-right');
      pages.push(TOTAL_PAGES);
    }

    return pages;
  };

  const pagesToRender = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className='flex flex-wrap justify-center gap-2'>
        {/* Previous */}
        {currPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href='#'
              className='px-4 py-2 text-lg font-medium rounded-md transition-all bg-customPalette-blue/10 text-customPalette-black hover:bg-customPalette-yellow/50'
              onClick={(e) => {
                e.preventDefault();
                setCurrPage(currPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {pagesToRender.map((page, idx) => {
          if (page === 'ellipsis-left' || page === 'ellipsis-right') {
            return (
              <PaginationItem key={idx}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={idx}>
              <PaginationLink
                href='#'
                isActive={currPage === page}
                className={`px-4 py-2 text-lg font-medium rounded-md transition-all ${
                  currPage === page
                    ? 'bg-customPalette-blue text-white'
                    : 'bg-customPalette-blue/10 text-customPalette-black hover:bg-customPalette-yellow/50'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        {currPage < TOTAL_PAGES && (
          <PaginationItem>
            <PaginationNext
              href='#'
              className='px-4 py-2 text-lg font-medium rounded-md transition-all bg-customPalette-blue/10 text-customPalette-black hover:bg-customPalette-yellow/50'
              onClick={(e) => {
                e.preventDefault();
                setCurrPage(currPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
