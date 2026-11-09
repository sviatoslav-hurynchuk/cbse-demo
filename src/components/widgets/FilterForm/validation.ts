import type { FilterFormValues, FilterFormErrors } from './types';

export function validateFilters(values: FilterFormValues): FilterFormErrors {
  const errors: FilterFormErrors = {};
  const trimmed = values.search.trim();

  if (trimmed.length > 50) {
    errors.search = 'Максимальна довжина пошуку — 50 символів';
  } else if (trimmed && !/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s\-'.]*$/.test(trimmed)) {
    errors.search = 'Назва може містити лише літери, дефіс та пробіли';
  }

  if (values.minCases < 0) {
    errors.minCases = 'Поріг не може бути від’ємним';
  }

  return errors;
}
