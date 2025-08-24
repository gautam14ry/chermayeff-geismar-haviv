import Link from 'next/link'
import './VeiwAllWork.css'

const VeiwAllWork = () => {
  return (
    <section className="pageContent pageContent--viewAllWork">
        <Link href="/work/logos/">View more logos</Link>
    </section>
  )
}

export default VeiwAllWork