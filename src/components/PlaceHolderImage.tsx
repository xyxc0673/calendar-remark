import undrawCityLife from '../assets/images/undraw_city_life.svg';

const PlaceHolderImage = () => {
  return (
    <div className='justify-center flex-1 hidden md:flex'>
      <img src={undrawCityLife} className='w-3/5 h-auto opacity-60' />
    </div>
  );
};

export default PlaceHolderImage;
