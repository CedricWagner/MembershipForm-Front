import React, { FC, useState } from "react";
import { HiDocumentDownload } from "react-icons/hi";
import Container from "../../components/Container/Container";
import DateRangeFilter from "../../components/DateRangeFilter/DateRangeFilter";
import ExportButton from "../../components/ExportButton/ExportButton";
import PageTitle from "../../components/PageTitle/PageTitle";

interface ExportMembersProps {}
interface DateRangeInterface {
  start: string | false;
  end: string | false;
}

const ExportMembers: FC<ExportMembersProps> = () => {
  const [dateRange, setDateRange] = useState<DateRangeInterface>({
    start: false,
    end: false,
  });

  const changeFilters = (start: string, end: string) => {
    setDateRange({
      start: start,
      end: end,
    });
  };

  return (
    <div data-testid="ExportMembers">
      <Container>
        <PageTitle>Export des adhésions</PageTitle>
        <div className="flex flex-wrap items-start">
          <DateRangeFilter onFilter={changeFilters} />
          {dateRange.start && dateRange.end && (
            <ExportButton dateStart={dateRange.start} dateEnd={dateRange.end}>
              <HiDocumentDownload size={25} className="mb-4" />
              <p>Exporter les adhésions pour cette période</p>
            </ExportButton>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ExportMembers;
