"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, RotateCcw } from "lucide-react";
import {
  SPECIALTIES,
  INDUSTRIES,
  COMPANY_SIZES,
  CREDENTIALS,
} from "@/lib/constants";
import type { Consultant } from "@/lib/mock-data";

interface Filters {
  search: string;
  specialty: string;
  industry: string;
  companySize: string;
  credential: string;
  availableThisWeek: boolean;
}

const INITIAL_FILTERS: Filters = {
  search: "",
  specialty: "",
  industry: "",
  companySize: "",
  credential: "",
  availableThisWeek: false,
};

interface SearchFiltersProps {
  consultants: Consultant[];
  onFilter: (filtered: Consultant[]) => void;
}

export default function SearchFilters({
  consultants,
  onFilter,
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const applyFilters = useCallback(
    (currentFilters: Filters) => {
      let results = [...consultants];

      // Text search
      if (currentFilters.search.trim()) {
        const query = currentFilters.search.toLowerCase();
        results = results.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.headline.toLowerCase().includes(query) ||
            c.specialties.some((s) => s.toLowerCase().includes(query)) ||
            c.industries.some((i) => i.toLowerCase().includes(query))
        );
      }

      // Specialty filter
      if (currentFilters.specialty) {
        results = results.filter((c) =>
          c.specialties.includes(currentFilters.specialty)
        );
      }

      // Industry filter
      if (currentFilters.industry) {
        results = results.filter((c) =>
          c.industries.includes(currentFilters.industry)
        );
      }

      // Company size filter
      if (currentFilters.companySize) {
        results = results.filter((c) =>
          c.companySizes.includes(currentFilters.companySize)
        );
      }

      // Credential filter
      if (currentFilters.credential) {
        results = results.filter((c) =>
          c.credentials.includes(currentFilters.credential)
        );
      }

      // Available this week toggle
      if (currentFilters.availableThisWeek) {
        results = results.filter(
          (c) =>
            c.nextAvailable === "Today" ||
            c.nextAvailable === "Tomorrow" ||
            c.nextAvailable === "This week"
        );
      }

      onFilter(results);
    },
    [consultants, onFilter]
  );

  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(INITIAL_FILTERS);
  }

  const hasActiveFilters =
    filters.search !== "" ||
    filters.specialty !== "" ||
    filters.industry !== "" ||
    filters.companySize !== "" ||
    filters.credential !== "" ||
    filters.availableThisWeek;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <label htmlFor="consultant-search" className="sr-only">
          Search consultants
        </label>
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
          aria-hidden="true"
        />
        <input
          id="consultant-search"
          type="search"
          placeholder="Search by name, specialty, or industry..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Specialty */}
        <div>
          <label
            htmlFor="filter-specialty"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Specialty
          </label>
          <select
            id="filter-specialty"
            value={filters.specialty}
            onChange={(e) => updateFilter("specialty", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
          >
            <option value="">All Specialties</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label
            htmlFor="filter-industry"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Industry
          </label>
          <select
            id="filter-industry"
            value={filters.industry}
            onChange={(e) => updateFilter("industry", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label
            htmlFor="filter-company-size"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Company Size
          </label>
          <select
            id="filter-company-size"
            value={filters.companySize}
            onChange={(e) => updateFilter("companySize", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
          >
            <option value="">All Sizes</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Credential */}
        <div>
          <label
            htmlFor="filter-credential"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Credential
          </label>
          <select
            id="filter-credential"
            value={filters.credential}
            onChange={(e) => updateFilter("credential", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[44px]"
          >
            <option value="">All Credentials</option>
            {CREDENTIALS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Toggle + Reset */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={filters.availableThisWeek}
              onChange={(e) =>
                updateFilter("availableThisWeek", e.target.checked)
              }
              className="sr-only peer"
            />
            <span className="w-11 h-6 bg-neutral-300 rounded-full peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50 peer-focus-visible:ring-offset-2 transition-colors" />
            <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
          </span>
          <span className="text-sm font-medium text-neutral-700">
            Available this week
          </span>
        </label>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors min-h-[44px]"
            type="button"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
