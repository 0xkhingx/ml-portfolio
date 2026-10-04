"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MAIN_PORTRAIT_SRC = "/images/about/portrait-main.png";
const SECONDARY_PORTRAIT_SRC = "/images/about/portrait-secondary.png";

export function AboutTeaser() {
  return (
    <section aria-label="About me" id="about" className="overflow-x-clip">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-14 px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md md:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative aspect-[4/5] w-[68%] overflow-hidden rounded-xl"
          >
            <Image
              src={MAIN_PORTRAIT_SRC}
              alt="Portrait of Dre"
              fill
              sizes="(max-width: 768px) 80vw, 400px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="absolute bottom-6 right-0 aspect-square w-[34%] overflow-hidden rounded-xl md:w-[40%]"
          >
            <Image
              src={SECONDARY_PORTRAIT_SRC}
              alt=""
              fill
              sizes="(max-width: 768px) 40vw, 240px"
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            A bit about me
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/60 sm:text-base">
            I&rsquo;m Dre, a software engineer focused on building useful
            products for the web and exploring machine learning. I enjoy
            thoughtful interfaces, strong systems, and work that sits between
            engineering and creativity.
          </p>
          <Link
            href="/about"
            className="group/more mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
          >
            More about me
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/more:translate-x-0.5 motion-reduce:transform-none"
            >
              ↗
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
