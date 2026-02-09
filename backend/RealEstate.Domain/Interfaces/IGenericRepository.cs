namespace RealEstate.Domain.Interfaces
{
    // The Generic Repository (The "Master" Interface)
    //Instead of writing "Add," "Update," and "Delete" for every single entity, we write it once for all.

    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> GetAllAsync();
        Task AddAsync(T entity);

        Task<int> SaveChangesAsync();

        void Update(T entity);
        void Delete(T entity);

    }
}
