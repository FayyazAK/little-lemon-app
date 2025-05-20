import { Link } from 'react-router-dom';

import HeroImage from '../../assets/restaurant-food.jpg';
import Button from '../../components/ui/button/Button';

const Hero = () => {
    const handleClick = () => {
        console.log('Button was clicked!');
    };

    return (
        <section className='hero-section'>
            <div className='col-1 hero-content'>
                <h2 className='hero-title'>Little Lemon</h2>
                <p className='hero-location'>Chicago</p>
                <p className='hero-descr'>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Our dishes celebrate the flavors of the Mediterranean coast, using only the freshest ingredients sourced locally.</p>
                <Link to='/reservation' className="cta-link">
                    <Button color='ctaButtonColor' text='Reserve a Table' onClick={handleClick} />
                </Link>
            </div>
            <div className='col-2'>
                <img className='hero-image' src={HeroImage} alt='Restaurant specialty dish' />
            </div>
        </section>
    );
};

export default Hero;
