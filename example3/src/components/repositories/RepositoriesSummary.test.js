import { screen, render } from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'

test('should show information about repository', () => {
  // fake repository
  const repository = {
    language: 'Javascript',
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  }
  render(<RepositoriesSummary repository={repository} />)
  for (const key in repository) {
    const value = repository[key]
    const element = screen.getByText(new RegExp(value))
    expect(element).toBeInTheDocument()
  }
})