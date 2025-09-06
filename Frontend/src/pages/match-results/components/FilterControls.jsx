import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterControls = ({ 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy, 
  onRefresh,
  isLoading 
}) => {
  const sortOptions = [
    { value: 'similarity', label: 'Similarity Score' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'location', label: 'Nearest Location' },
    { value: 'age', label: 'Age' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Matches' },
    { value: 'high', label: 'High Confidence (90%+)' },
    { value: 'medium', label: 'Good Matches (75-89%)' },
    { value: 'potential', label: 'Potential Matches (60-74%)' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-0">
            <Select
              label="Sort by"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Select
              label="Filter by"
              options={filterOptions}
              value={filterBy}
              onChange={setFilterBy}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <Button
            variant="outline"
            size="default"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefresh}
            loading={isLoading}
            className="touch-target whitespace-nowrap"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;