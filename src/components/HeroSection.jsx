import { Title, Text, Box } from "@mantine/core";
import { motion } from "framer-motion";

export default function HeroSection() {
	return (
		<Box id="hero" py={{ base: 48, md: 64 }} as="section">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Title
					order={1}
					ta="center"
					fw={700}
					size={{ base: "2.5rem", md: "3.5rem" }}
					style={{ lineHeight: 1.2 }}
					variant="gradient"
					gradient={{ from: "primary.4", to: "primary.7", deg: 135 }}
				>
					CoolTech
				</Title>
				<Text
					ta="center"
					size="lg"
					c="dark.1"
					mt="md"
					maw={560}
					mx="auto"
				>
					Here you will find only cool and useful tech. That either
					helps you or make your tech life easier and cool.
				</Text>
			</motion.div>
		</Box>
	);
}
