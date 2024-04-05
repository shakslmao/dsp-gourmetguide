import multiprocessing


def recommendation_engine(engine_id):
    print(f"Running engine {engine_id}")
    return f"Results from engine {engine_id}"


if __name__ == "__main__":
    engine_ids = [1, 2, 3]  # Identifiers for engines
    with multiprocessing.Pool(processes=3) as pool:
        results = pool.map(recommendation_engine, engine_ids)
        print(results)
