import React, { useCallback } from 'react'

function FilterButton({ filter, value, onFilterChange }) {

  const handleStateChange = useCallback(value => {
    onFilterChange(value)
  }, [onFilterChange])

  return (
    <button onClick={() => handleStateChange(value)}
      className={filter === value ? "filters__btn active" : "filters__btn"}>{value}</button>
  )
}

export default FilterButton
