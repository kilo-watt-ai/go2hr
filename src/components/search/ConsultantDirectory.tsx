"use client";

import { useState, useCallback } from "react";
import type { Consultant } from "@/lib/mock-data";
import SearchFilters from "@/components/search/SearchFilters";
import ConsultantCard from "@/components/search/ConsultantCard";

interface ConsultantDirectoryProps {
  consultants: Consultant[];
}

export default function ConsultantDirectory({
  consultants,
}: ConsultantDirectoryProps) {
  const [filteredConsultants, setFilteredConsultants] =
    useState<Consultant[]>(consultants);

  const handleFilter = useCallback((filtered: Consultant[]) => {
    setFilteredConsultants(filtered);
  }, []);

  return (
    <>
      {/* Filters */}
      <section aria-label="Search filters" className="mb-8">
        <SearchFilters consultants={consultants} onFilter={handleFilter} />
      </section>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-neutral-600" role="status" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-neutral-900">
            {filteredConsultants.length}
          </span>{" "}
          consultant{filteredConsultants.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Results Grid */}
      {filteredConsultants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <ConsultantCard key={consultant.slug} consultant={consultant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-xl border border-neutral-200">
          <div className="max-w-md mx-auto">
            <p className="text-lg font-semibold text-neutral-900 mb-2">
              No consultants found
            </p>
            <p className="text-neutral-600">
              Try adjusting your filters or search terms to find the right HR
              consultant for your needs.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
