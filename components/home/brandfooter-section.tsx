const FOOTER_BG =
  "https://xiangleratchetstrap.com/cdn/imgs/v1764828637/get_to_know_us_vzvytv.png";

export default function BrandFooter() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        bg-neutral-900 text-white
        py-24 md:py-32
      "
    >
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${FOOTER_BG})` }}
      />

      {/* 深色遮罩，保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-700/90 via-neutral-800/70 to-neutral-500/40" />

      {/* 内容 */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl">
          {/* 标题 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Building safer transport <br />
            together
          </h2>

          {/* 描述 */}
          <p className="text-white max-w-xl mb-8 leading-relaxed">
            With decades of manufacturing experience, we support global OEM
            brands with reliable tie-down systems and cargo control solutions.
            From engineering to production, our focus remains on safety,
            consistency, and long-term partnership.
          </p>
        </div>
      </div>
    </section>
  );
}
