import { createFileRoute } from '@tanstack/react-router'
import { array, object, optional, pipe, string, transform, union } from 'valibot'
import { Head } from '../../components/shared/Head'
import { PROJECT_NAME } from '../../constants/project'

const validationSearchParams = object({
  params: optional(
    union([
      pipe(
        string(),
        transform((value) => [value]),
      ),
      array(string()),
    ]),
  ),
})

export const Route = createFileRoute('/_layout/')({
  validateSearch: validationSearchParams,
  component: () => <Home />,
})

const Home = () => {
  const { params } = Route.useSearch()

  return (
    <div>
      <Head title="Home" description={`Top Page of ${PROJECT_NAME}`} />
      <p>Hello {PROJECT_NAME} !</p>
      {params !== undefined && params.length > 0 && (
        <p>Params: {params.map((param) => param).join(', ')}</p>
      )}
    </div>
  )
}
