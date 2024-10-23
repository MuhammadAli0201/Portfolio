using Microsoft.EntityFrameworkCore;

namespace Portfolio.Data.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<IEnumerable<T>> GetAllAsync();
        public Task<T> GetAsync(Guid id);
        public Task<T> AddAsync(T entity);
        public Task<T> UpdateAsync(T entity);
        public Task<T> DeleteAsync(Guid id);
    }
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly PortfolioDBContext _appDBContext;

        public GenericRepository(PortfolioDBContext appDBContext)
        {
            this._appDBContext = appDBContext;
        }
        public async Task<T> AddAsync(T entity)
        {
            try
            {
                await _appDBContext.Set<T>().AddAsync(entity);
                await _appDBContext.SaveChangesAsync();
                return entity;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<T> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _appDBContext.Set<T>().FindAsync(id);

                _appDBContext.Set<T>().Remove(entity);

                await _appDBContext.SaveChangesAsync();

                return entity;
            }
            catch
            {
                throw;
            }
        }


        public async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                return _appDBContext.Set<T>().AsEnumerable<T>();
            }
            catch
            {
                throw;
            }
        }

        public async Task<T> GetAsync(Guid id)
        {
            try
            {
                return await _appDBContext.Set<T>().FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<T> UpdateAsync(T entity)
        {
            try
            {
                _appDBContext.Entry(entity).State = EntityState.Detached;
                _appDBContext.Set<T>().Attach(entity);
                _appDBContext.Entry(entity).State = EntityState.Modified;
                await _appDBContext.SaveChangesAsync();

                return entity;
            }
            catch
            {
                throw;
            }
        }

    }
}
