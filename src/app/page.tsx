import SliderComponent from '@/components/Slider';
import FeaturedItems from '@/components/FeaturedItems';
import OfferComponent from '@/components/Offer';

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<main>
			<SliderComponent />
			<FeaturedItems />
			<OfferComponent />
		</main>
	);
}
