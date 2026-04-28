import _startCase from 'lodash/startCase';

interface IHeaderProps {
  title: string;
}

function Header({ title }: IHeaderProps) {
  return (
    <h1 className="my-8 text-2xl font-thin uppercase tracking-wider text-slate-700 dark:text-slate-300">
      {_startCase(title)}
    </h1>
  );
}

export default Header;
