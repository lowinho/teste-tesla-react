
import { LoaderModel } from '../models/LoaderModel';
import '../styles/loader.scss';

type LoaderProps = LoaderModel & {
  loading?: boolean
};

export function Loader({ ...props }: LoaderProps) {
  return (
      <div className="container">
        <div className="loader"></div>
      </div>
    
  )
}