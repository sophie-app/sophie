import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Head } from '../../components/shared/Head'
import { PROJECT_NAME } from '../../constants/project'

const validationSearchParams = z.object({
  params: z
    .union([z.string().transform((input) => [input]), z.array(z.string()).min(1)])
    .default([]),
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
      {params.length > 0 && <p>Params: {params.map((param) => param).join(', ')}</p>}
    </div>
  )
}
